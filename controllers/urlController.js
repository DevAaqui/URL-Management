const crypto = require('crypto');
const Url = require('../models/Url');
const { Op } = require('sequelize');
const { sendErrorResponse } = require('../utils/responseHandler');
const UrlAccessLog = require('../models/urlAccessLog');

// USING LOCAL URL SHORTNER BECAUSE OTHER PACKAGES ARE TAKING TIME FOR PROMISE RETURN
const generateAlias = () => crypto.randomBytes(4).toString('hex');

const redirectShortUrl = async (req, res) => {
    const { alias } = req.params;
  
    try {
      const urlRecord = await Url.findOne({ where: { shortUrl: alias } });
  
      if (!urlRecord) {
        return sendErrorResponse(res, "Shortened URL does not exist.", 404);
      }

      if (urlRecord?.expirationStatus) {
        return sendErrorResponse(res, "The shortened URL has expired.", 410);
      }

      await Url.update(
        { clickCount: urlRecord.clickCount + 1 },
        { where: { id: urlRecord.id } }
      );
  
      // Log access metadata
      await UrlAccessLog.create({
        urlId: urlRecord.id,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'] || 'Unknown',
      });
  
      // Redirect to the original URL
      return res.redirect(urlRecord.originalUrl);
  
    } catch (error) {
      console.error('Error during URL redirection:', error);
      return sendErrorResponse(res, "Internal server error", 500);
    }
  };

const getShortUrls = async (req, res) => {
    const userId = req.user.id;
    const { page = 1, itemsPerPage = 10, startDate, endDate, isExpired } = req.query;
  
    const filter = {
      userId,
    };
  
    if (startDate && endDate) {
      filter.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    }

    if (isExpired !== undefined) {
        filter.expirationStatus = isExpired === 'true';
    }
  
    const limit = parseInt(itemsPerPage); 
    const offset = (parseInt(page) - 1) * limit;
  
    try {
      const urls = await Url.findAll({
        where: filter,
        limit,
        offset,
      });
  
      if (urls.length === 0) {
        return res.status(404).json({ message: 'No URLs found.' });
      }
  
      const totalUrls = await Url.count({ where: filter });
  
      return res.status(200).json({
        message: 'URLs retrieved successfully.',
        data: urls,
        pagination: {
          page: parseInt(page),
          itemsPerPage: limit,
          total: totalUrls,
          totalPages: Math.ceil(totalUrls / limit),
        },
      });
    } catch (error) {
      console.error('Error retrieving URLs:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

const deleteShortUrl = async (req, res) => {
    const { id } = req.params;
  
    try {
      const urlRecord = await Url.findOne({ where: { id } });
  
      if (!urlRecord) {
        return res.status(404).json({ message: 'URL not found.' });
      }
  
      await urlRecord.destroy();
  
      return res.status(200).json({ message: 'Short URL deleted successfully!' });
    } catch (error) {
      console.error('Error deleting short URL:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

const updateShortUrl = async (req, res) => {
    const { id } = req.params;
    const { originalUrl, customAlias, expirationDate } = req.body;
  
    try {
      const urlRecord = await Url.findOne({ where: { id } });
  
      if (!urlRecord) {
        return res.status(404).json({ message: 'URL not found.' });
      }
  
      if (customAlias) {
        const existingAlias = await Url.findOne({ where: { shortUrl: customAlias, id: { $ne: id } } });
        if (existingAlias) {
          return res.status(400).json({ message: 'Alias already in use. Please choose another alias.' });
        }
      }
  
      urlRecord.originalUrl = originalUrl || urlRecord.originalUrl;
      urlRecord.shortUrl = customAlias || urlRecord.shortUrl;
      urlRecord.expirationDate = expirationDate || urlRecord.expirationDate;
  
      await urlRecord.save();
  
      return res.status(200).json({
        message: 'Short URL updated successfully!',
      });
    } catch (error) {
      console.error('Error updating short URL:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

const createShortUrl = async (req, res) => {
  const { originalUrl, customAlias, expirationDate } = req.body;
  const userId = req.user.id;

  if (!originalUrl) {
    return res.status(400).json({ message: 'Original URL is required' });
  }

  try {
    let alias = customAlias;

    if (customAlias) {
      const existingAlias = await Url.findOne({ where: { shortUrl: customAlias } });
      if (existingAlias) {
        return res.status(400).json({ message: 'Alias already in use. Please choose another alias.' });
      }
    } else {
      let isUnique = false;

      while (!isUnique) {
        alias = generateAlias();
        const existingAlias = await Url.findOne({ where: { shortUrl: alias } });
        if (!existingAlias) {
          isUnique = true;
        }
      }
    }

    const newUrl = await Url.create({
      originalUrl,
      shortUrl: alias,
      userId,
      expirationDate,
    });

    return res.status(201).json({
      message: 'Short URL created successfully!',
    });
  } catch (error) {
    console.error('Error creating short URL:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createShortUrl,
  updateShortUrl,
  deleteShortUrl,
  getShortUrls,
  redirectShortUrl,
};
