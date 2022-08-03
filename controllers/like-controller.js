const { Like } = require('../models')
const helpers = require('../_helpers')

const likeController = {
  postLikeToTweet: async (req, res, next) => {
    try {
      const currentUserId = helpers.getUser(req)?.id
      const { id } = req.params

      if (!Number(id)) throw new Error('Params id is required.')

      await Like.findOrCreate({ where: { UserId: currentUserId, TweetId: id } })

      res.json({
        status: 'success'
      })
    } catch (error) {
      next(error)
    }
  },

  postUnlikeToTweet: async (req, res, next) => {
    try {
      const currentUserId = helpers.getUser(req)?.id
      const { id } = req.params

      if (!Number(id)) throw new Error('Params id is required.')

      const userLikedTweet = await Like.findOne({ where: { UserId: currentUserId, TweetId: id } })
      if (!userLikedTweet) throw new Error('Current user has not liked this tweet.')

      await Like.destroy({ where: { user_id: currentUserId, tweet_id: id } })

      res.json({
        status: 'success'
      })
    } catch (error) {
      next(error)
    }
  },
}

module.exports = likeController
