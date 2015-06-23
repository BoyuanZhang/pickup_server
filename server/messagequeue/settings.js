module.exports = {
	config: {
		port: '5672',
		timeout: '10000',
		host: process.env.MONGOLAB_URI || 'amqp://127.0.0.1'
	},
	queues: {
		defaultName: 'default-queue'
	},
	exchanges: {
		defaultName: 'default-exchange'
	}
};