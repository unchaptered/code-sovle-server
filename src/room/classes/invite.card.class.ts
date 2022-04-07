import { ObjectId } from 'mongoose';
import { Schema } from '@nestjs/mongoose';

import Card from './card.class';
import CardType from '../enum/card.type.enum';

@Schema()
export default class InviteCard extends Card {

    tpye: CardType.INVITE_CARD = CardType.INVITE_CARD;

    constructor(owner: ObjectId) {
        super(owner);
    }

}