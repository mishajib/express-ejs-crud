const home = async (req, res) => {
    return res.render('index', {title: 'Home Page'});
};

module.exports = {
    home
};