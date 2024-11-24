const crypto = require('crypto');
const Url = require('../models/Url');

// USING LOCAL URL SHORTNER BECAUSE OTHER PACKAGES ARE TAKING TIME FOR PROMISE RETURN
const generateAlias = () => crypto.randomBytes(4).toString('hex');

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
};
