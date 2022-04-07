import { ObjectId } from 'mongoose';
import { Schema } from '@nestjs/mongoose';

import Card from './card.class';
import CardType from '../enum/card.type.enum';

@Schema()
export default class ApplyCard extends Card {

    tpye: CardType.APPLY_CARD = CardType.APPLY_CARD;

    constructor(owner: ObjectId) {
        super(owner);
    }
}