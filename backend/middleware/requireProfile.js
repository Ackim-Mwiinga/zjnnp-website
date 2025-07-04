const requireProfile = (req, res, next) => {
  if (!req.user?.isProfileComplete) {
    return res.status(403).json({
      message: 'Please complete your profile before accessing this page',
      redirect: '/complete-profile'
    });
  }
  next();
};

module.exports = requireProfile;
