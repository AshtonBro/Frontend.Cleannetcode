'use strict';

export default class Issue {
    constructor(issueDescription) {
        this.id = this.generateRndId();
        this.description = issueDescription;
        this.isDone = false;
    }

    generateRndId() {
        return `id${Math.round(Math.random() * 1e8).toString(16)}`;
    }
}
