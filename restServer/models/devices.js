const mongoose = require('mongoose');
const devicesSchema = mongoose.Schema({
    metadata: {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        owner:{
            type: String,
            required: true
        }
    },
    data:{
        cpuTemp: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }
});

const Device = module.exports = mongoose.model('Devices', devicesSchema);

module.exports.addDevice = (device, callback) => {
    Device.create(device, callback);
}
module.exports.getDevice = (callback) => {
    Device.find(callback);
}
module.exports.getDevicebyDeviceType = (device_type, callback) => {
    query={
        "metadata.type": device_type
    }
    Device.find(query,callback);
}