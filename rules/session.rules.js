const SessionRules = {

    validate(session, user) {

        return {
            allowed: true
        };

    },

    canCreate(user) {

        return {
            allowed: true
        };

    }

};

module.exports = SessionRules;