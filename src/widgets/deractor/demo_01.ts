import {Controller, Get, Post} from '@nestjs/common'

@Controller('cats')
export class CastsContainer {
    @Post()
    create():string {
        return "This is action adds a new cat"
    },
    @Get()
    findAll():string {
        return 'This action returns all cats'
    }
}