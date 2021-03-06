// Require our models -- these should register the model into mongoose
// so the rest of the application can simply call mongoose.model('Users')
// anywhere the User model needs to be used.
require('./addresses');
require('./billing');
require('./categories');
require('./movies');
require('./orders');
require('./reviews');
require('./subscriptions');
require('./MovieQueues');
require('./users');
