class ApiResponse {
    constructor(status=200, data=[], message="Success") {
        this.status = status;
        this.data = data;
        this.msg = message;
        this.success = status < 400;
    }
}

export { ApiResponse }