/** @type {number} */
let time = performance.now();

let msfreeze = {
    // generated an array of random numbers
    array(number = 1000, limit = 100) {
        return [...Array(number)].map((_) => Math.ceil(Math.random() * limit));
    },
    // create a freeze loop
    loop(min = 20) {
        setTimeout(() => {
            const difference = performance.now() - time;
            if (difference > min) {
                this.log &&
                    console.log(
                        "[msfreeze] process freeze during [" +
                            Math.round(difference) +
                            "]ms"
                    );
                this.records.push(difference);
                this.onrecord();
            }
            time = performance.now();
            this.canrun ? this.loop(min) : (this.canrun = true);
        }, 1);
    },
    // list of time records
    records: [],
    // function executed everytime a record is added
    // you should overwrite this
    onrecord: () => {},
    // function to stop the current loops
    stop() {
        this.canrun = false;
    },
    // if the loop can continue
    canrun: true,
    // if we trigger a console log
    log: true,
};

export default msfreeze;
