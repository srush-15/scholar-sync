class ApiResponse {
    constructor(success,data,message="Successful Operation"){
        this.success = success
        this.data = data
        this.message = message
    }
}
export {ApiResponse}