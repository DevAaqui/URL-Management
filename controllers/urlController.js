const crypto = require('crypto');
const Url = require('../models/Url');

// USING LOCAL URL SHORTNER BECAUSE OTHER PACKAGES ARE TAKING TIME FOR PROMISE RETURN
const generateAlias = () => crypto.randomBytes(4).toString('hex');

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
};
