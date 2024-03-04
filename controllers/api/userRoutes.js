const router = require("express").Router();
const { User } = require("../../models");

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

router.put('/:id', /*withAuth,*/ async (req, res) => {
    try {
        const updateUser = await User.update(
            {
                ...req.body
            },
            {
                where: {
                    id: req.params.id,
                    //   user_id: req.session.user_id,
                },
            }
        );
        if (!updateUser) {
            res.status(404).json({ message: 'no blog post found with this id' });
            return;
        }

        res.status(200).json(updateUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', /*withAuth,*/ async (req, res) => {
    try {
        const deleteUser = await User.destroy({
            where: {
                id: req.params.id,
                // user_id: req.session.user_id,
            },
        });

        if (!deleteUser) {
            res.status(404).json({ message: 'no blog post found with this id' });
            return;
        }

        res.status(200).json(deleteUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;