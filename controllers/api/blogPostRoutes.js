const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

//test get
router.get('/', withAuth, async (req, res) => {
    const allPosts = await BlogPost.findAll();
    res.status(200).json(allPosts);
});

router.post('/', withAuth, async (req, res) => {
    try {
        const newBlogPost = await BlogPost.create(req.body);

        res.status(200).json(newBlogPost);
    } catch(err) {
        res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const updateBlogPost = await BlogPost.update(
          {
                ...req.body
          },
          {
            where: {
              id: req.params.id,
              user_id: req.session.user_id,
            },
          }
        );
        if (!updateBlogPost) {
          res.status(404).json({ message: 'no blog post found with this id' });
          return;
        }

        res.status(200).json(updateBlogPost);
    } catch(err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deleteBlogPost = await BlogPost.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!deleteBlogPost){
            res.status(404).json({ message: 'no blog post found with this id'});
            return;
        }

        res.status(200).json(deleteBlogPost);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;