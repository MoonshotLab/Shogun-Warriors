# Shogun Warriors

A tweet fountain which showcases content matching a specific hash tag.

Content is showcased to match Barkley "Spark" posters.

Upon receiving the tweet, the app will do the following:

* Reply back to the user with a screenshot of the poster generated.
* Physically print the poster
* Store the tweet in a database for later reference


## Environment Variables
* TWITTER_CONSUMER_KEY
* TWITTER_CONSUMER_SECRET
* TWITTER_ACCESS_TOKEN
* TWITTER_ACCESS_TOKEN_SECRET
* REPLY_TO_TWEETS : whether or not to reply to tweets
* HASH_TAG : the hash tag to follow
* DB_CONNECT : the mongo connection string
* URL2PNG_KEY : convert to png key
* URL2PNG_PRIVATE_KEY : convert to png private key
* URL : the url of this application
* S3_KEY
* S3_SECRET
