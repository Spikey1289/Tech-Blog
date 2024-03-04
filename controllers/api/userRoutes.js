const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require('../../utils/auth');

// test get
router.get('/', async (req, res) => {
    const allUsers = await User.findAll();
    res.status(200).json(allUsers);
});

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        res.status(200).json(newUser);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', withAuth , async (req, res) => {
    try {
        if (req.session.user_id === parseInt(req.params.id)) {
            const updateUser = await User.update(
                {
                    ...req.body
                },
                {
                    where: {
                        id: req.params.id,
                        
                    },
                }
            );
            if (!updateUser) {
                res.status(404).json({ message: 'no blog post found with this id' });
                return;
            }

            res.status(200).json(updateUser);
        } else {
            res.status(401).json({ message: 'you are not this user, cannot update' });
            return;
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        if (req.session.user_id === parseInt(req.params.id)){
            const deleteUser = await User.destroy({
                where: {
                    id: req.params.id,
                },
            });

            if (!deleteUser) {
                res.status(404).json({ message: 'no user found with this id' });
                return;
            }

            res.status(200).json(deleteUser);
        } else {
            res.status(401).json({ message: 'you are not this user, cannot delete'});
            return;
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//login routes
router.post('/login', async (req, res) => {
    try {
        // Find the user by email address, if none are found throws and error
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        //verifies password
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        //creates session data
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

// logout route
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


module.exports = router;