import { JsonController, Get } from 'routing-controllers'
import User from './entity'

@JsonController()
export default class UserController {

    @Get('/users')
    async allUsers() {
        const users = await User.find()
        return users
    }

}