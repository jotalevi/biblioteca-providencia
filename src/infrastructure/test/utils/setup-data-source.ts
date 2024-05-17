import { DataType, newDb } from 'pg-mem'
import { v4 } from 'uuid'
import { DataSource } from 'typeorm'

import { UserEntity } from '../../../application/users/user.entity'
import { TokenEntity } from '../../../application/auth/token/token.entity'
import { LikeEntity } from '../../../application/likes/like.entity'
import { PostEntity } from '../../../application/posts/post.entity'
import { FollowEntity } from '../../../application/follows/follow.entity'
import { CommentEntity } from '../../../application/comments/comment.entity'

const entities = [UserEntity, TokenEntity, LikeEntity, PostEntity, FollowEntity, CommentEntity]

export async function setupDataSource() {
  const database = newDb({
    autoCreateForeignKeyIndices: true,
  })

  database.public.registerFunction({
    implementation: () => 'test',
    name: 'current_database',
  })

  database.public.registerFunction({
    implementation: () => '1',
    name: 'version',
  })

  database.public.registerFunction({
    implementation: () => 'test',
    name: 'obj_description',
    args: [DataType.regclass, DataType.text],
  })

  database.registerExtension('uuid-ossp', (schema) => {
    schema.registerFunction({
      name: 'uuid_generate_v4',
      returns: DataType.uuid,
      implementation: v4,
      impure: true,
    })
  })

  const dataSource: DataSource = await database.adapters.createTypeormDataSource({
    type: 'postgres',
    entities: entities,
  })
  await dataSource.initialize()
  await dataSource.synchronize()

  return { dataSource, database }
}
