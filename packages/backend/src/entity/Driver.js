// @flow

import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { EntityBase } from '../entityBase';
import { Passenger } from './Passenger';

@Entity()
export class Driver /* extends EntityBase */ {
  @PrimaryColumn('varchar')
  username = '';

  @Column('float')
  currentLatitude = 0;

  @Column('float')
  currentLongitude = 0;

  @Column('float')
  rating = 0;

  @Column('int')
  totalReviews = 0;

  @Column('tinyint')
  active = 0;

  @OneToMany(type => Passenger, passenger => passenger.username)
  passengers: Passenger[];
}

export default Driver;
