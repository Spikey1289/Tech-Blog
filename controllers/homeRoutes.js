const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                }, {
                    model: Comment,
                    attributes: ['id'],
                }
            ],
        });
        
        const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));
        
        for (let i = 0; i < blogPosts.length; i++) {
            blogPosts[i].numComments = blogPosts[i].Comments.length;
            delete blogPosts[i].Comments;
        }

        res.render('homepage', {
            blogPosts,
            logged_in: req.session.logged_in,
        });
    } catch(err) {
        res.status(500).json(err); 
    }
});

router.get('/posts/:id', withAuth, async (req, res) => {
    try {
        const blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                }, {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ['name']
                        }
                    ]
                }
            ]
        });

        const blogPost = blogPostData.get({ plain: true });
        
        res.render('comments', {
            blogPost,
            user_id: req.session.user_id,
            logged_in: req.session.logged_in,
        });
    } catch(err) {

    }
});

router.get("/dashboard", withAuth, async (req, res) => {
    try {

        const userData = await User.findByPk(req.session.user_id);

        const blogPostData = await BlogPost.findAll({
            where: {
                user_id: req.session.user_id
            }
        });

        const commentData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                }, {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ['name']
                        }
                    ],
                    where: {
                        user_id: req.session.user_id
                    }
                }
            ]
        });

        const blogPosts = await blogPostData.map((blogPost) => blogPost.get({ plain: true }));
        const comments = await commentData.map((comment) => comment.get({ plain: true }));
        const user = await userData.get({plain: true});
        
        res.render('dashboard', {
            user,
            blogPosts,
            comments,
            user_id: req.session.user_id,
            logged_in: req.session.logged_in,
        });
    } catch(err) {
        console.error(err);
    }
});

router.get("/login", async (req, res) => {
    try {
        // Render the login-signup.handlebars template with necessary data
        res.render("login", {
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/signup", async (req, res) => {
    try {
        // Render the login-signup.handlebars template with necessary data
        res.render("signup", {
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;