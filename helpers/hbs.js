const moment = require('moment');

module.exports = {
    formatDate: function (date, format) {
        return moment(date).format(format)
    },
    truncate: function (string, numberofcharacters) {
        if (string.length > 150) {
            return string.slice(0, numberofcharacters) + "...."
        }
        return string;
    },
    //xóa bớt các thẻ HTML <p> </p> chẳng hạn
    stripTags: function (input) {
        return input.replace(/<(?:.|\n)*?>/gm, '')
    },
    editIcon: function (storyUser, loggedUser, storyId, floating = true) {
        if (storyUser._id.toString() == loggedUser._id.toString()) {
            if (floating) {
                return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
            } else {
                return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`
            }
        } else {
            return ''
        }
    },

}