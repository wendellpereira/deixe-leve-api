//Dependencies
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const prospectSchema = new mongoose.Schema({
    type: String,
    fullName: String,
    companyName: String,
    phone: String,
    role: String,
    email: String,
    cpf: String,
    rg: String,
    address: String,
    created: Date,
    updated: Date
});


/**
 * Pre-save middleware
 * */
prospectSchema.pre('save', function(next) {
    const now = new Date();

    // Sets creation and update date on the Prospect
    if (this.isNew) {
        this.created = now;
    } else {
        this.updated = now;
    }
    next();
});

mongoose.model('Event', prospectSchema);
