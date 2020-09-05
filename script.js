Facebook = {
    config: {
        scrollDelay: 3000,
        actionDelay: 5000,
        // set to -1 for no limit
        maxRequests: -1,
        totalRequestsSent: 0,
    },

// this is the entry point method of the script it excutes the first method which is scrollBottom
    init: function (data, config) {
        console.info("script initialized on the page...");
        setTimeout(() => this.scrollBottom(data, config), config.actionDelay);
    },
// this method scrolls to the bottom its value is window height then excutes insepect method
    scrollBottom: function (data, config) {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        setTimeout(() => this.inspect(data, config), config.scrollDelay);
    },

// this method gets the number of connect btns in the page then excutes the compile method
    inspect: function (data, config) {
        var totalBtns = document.querySelectorAll("[aria-label^='إضافة صديق']").length; 
        var elements = document.querySelectorAll("[aria-label^='إضافة صديق']");
        data.pageButtons = [...elements];
        console.debug("DEBUG: total search results found on page are " + totalBtns);
        if (totalBtns >= 0) {
            this.sendRequests(data, config);
        } else {
            console.warn("WARN: end of search results!");
            this.complete(config);
        }
    },

// start to send requests
    sendRequests: function (data, config) {
        console.debug("remaining requests " + config.maxRequests);
        if (config.maxRequests == 0){
            console.info("INFO: max requests reached for the script run!");
            this.complete(config);
        } else {
            console.debug('DEBUG: sending invite to ' + (data.pageButtonIndex + 1) + ' out of ' + data.pageButtonTotal);
            let BT = document.querySelectorAll("[aria-label^='إضافة صديق']");
            BT.forEach(b => b.click());
            setTimeout(() => {this.scrollBottom(data, config); config.totalRequestsSent++;}, config.actionDelay);
        }
    },

complete: function (config) {
        console.info('INFO: script completed created by ABDLRHMAN SOUDI');
    }
}

Facebook.init({}, Facebook.config);
