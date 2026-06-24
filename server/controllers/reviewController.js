import Review from "../models/Review.js";

export const createReview =
  async (req, res) => {

    try {

      const {
        user,
        product,
        rating,
        comment,
      } = req.body;

      const review =
        await Review.create({
          user,
          product,
          rating,
          comment,
        });

      res.status(201).json(
        review
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };

export const getReviews =
  async (req, res) => {

    try {

      const reviews =
        await Review.find({
          product:
            req.params.productId,
        })
          .populate(
            "user",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      res.json(reviews);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };

export const deleteReview =
  async (req, res) => {

    try {

      const review =
        await Review.findById(
          req.params.id
        );

      if (!review) {

        return res
          .status(404)
          .json({
            message:
              "Review not found",
          });

      }

      await review.deleteOne();

      res.json({
        message:
          "Review deleted successfully",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };