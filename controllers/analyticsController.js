const Url = require('../models/Url');
const { Op } = require('sequelize');
const { sendErrorResponse } = require('../utils/responseHandler');
const UrlAccessLog = require('../models/urlAccessLog');

const getUrlAnalytics = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
  
    try {
      const urlRecord = await Url.findOne({ where: { id, userId } });
  
      if (!urlRecord) {
        return res.status(404).json({ message: "URL not found or access denied." });
      }
  
      const accessLogs = await UrlAccessLog.findAll({
        where: { urlId: urlRecord.id },
        attributes: ['createdAt', 'ipAddress', 'userAgent'],
        order: [['createdAt', 'DESC']],
      });
  
      return res.status(200).json({
        message: "Analytics retrieved successfully.",
        data: {
          clickCount: urlRecord.clickCount,
          accessLogs,
        },
      });
    } catch (error) {
      console.error('Error retrieving analytics:', error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  module.exports = { getUrlAnalytics };
  