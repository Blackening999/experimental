Blog.SearchResultsController = Ember.ArrayController.extend({
    highlighted: function (key, value) {
        var lowered = value.toLowerCase(), keyword = this.get('keyword').toLowerCase(),
            startWord = lowered.indexOf(keyword), endWord = startWord + keyword.length ,
            word = value.substring(startWord, endWord), range = key === 'title'
                ? 0 : key === 'description'
                ? 15 : 100,
            beginning = "", ending = "";
        if (startWord < 0) {
            if (key !== 'text') return value;
            return "";
        } else {
            beginning = startWord < range || key === 'title'
                ? value.slice(range, startWord)
                : "..." + value.slice(startWord - range, startWord);
            ending = endWord + range > value.length || key === 'title'
                ? value.slice(endWord, value.length)
                : value.slice(endWord, endWord + range) + "...";
        }
        return beginning + "<span class='highlighted'>" + word + "</span>" + ending;

    },
    highlightedContent: function () {
        var _this = this;
        return this.get('arrangedContent').map(function (value, key) {
            return {
                title: _this.highlighted("title", value.get('title')),
                description: _this.highlighted("description", value.get('description')),
                text: _this.highlighted("text", value.get('text'))
            }
        });

    }.property('model.@each')
});