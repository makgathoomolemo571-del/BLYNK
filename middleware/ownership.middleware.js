const mongoose = require("mongoose");

module.exports = (Model, ownerField = "user") => {

    return async (req, res, next) => {

        try {

            const id =
                req.params.id ||
                req.params.postId ||
                req.params.profileId ||
                req.params.storyId ||
                req.params.reelId ||
                req.params.eventId;

            if (!id) {

                return res.status(400).json({
                    success: false,
                    message: "Resource id is required."
                });

            }

            if (!mongoose.Types.ObjectId.isValid(id)) {

                return res.status(400).json({
                    success: false,
                    message: "Invalid resource id."
                });

            }

            const resource = await Model.findById(id);

            if (!resource) {

                return res.status(404).json({
                    success: false,
                    message: "Resource not found."
                });

            }

            if (
                ["admin", "superadmin"].includes(req.user.role)
            ) {

                req.resource = resource;

                return next();

            }

            if (
                resource[ownerField]?.toString() !==
                req.user._id.toString()
            ) {

                return res.status(403).json({
                    success: false,
                    message: "You do not own this resource."
                });

            }

            req.resource = resource;

            next();

        } catch (err) {

            next(err);

        }

    };

};