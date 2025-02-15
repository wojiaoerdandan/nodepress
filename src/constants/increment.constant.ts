/**
 * @file Increment ID collection constant
 * @description 用于自增表的配置
 * @module constant/increment
 * @author Surmon <https://github.com/surmon-china>
 */

import { AutoIncrementIDOptions } from '@typegoose/auto-increment'

export const generalAutoIncrementIDConfig: AutoIncrementIDOptions = {
  field: 'id',
  startAt: 1,
  incrementBy: 1,
  trackerCollection: 'identitycounters',
  trackerModelName: 'identitycounter',
  // https://github.com/typegoose/auto-increment
  // https://github.com/typegoose/auto-increment/blob/master/src/autoIncrement.ts
  // https://github.com/typegoose/auto-increment/issues/11
  // fieldKey: 'field',
  // modelNameKey: 'modelName',
}
