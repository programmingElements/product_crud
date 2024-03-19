class ApiError extends Error {
    constructor(status=404,message="Failure",data=null) {
        super(message);
        this.status = status;
        this.data = data;
        this.msg = message;
        this.success = status > 399;
    }
}

export { ApiError};