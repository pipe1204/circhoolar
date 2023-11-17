import { g, config } from '@grafbase/sdk'

const user = g.model('User', {
  name: g.string().length({ min: 3, max: 20 }),
  email: g.string().unique(),
  password: g.string(),
  avatarUrl: g.string(),
  posts: g.relation(() => Post).list().optional(),
})

const Post = g.model('Post', {
  title: g.string().length({ min: 3 }),
  description: g.string().optional(),
  image: g.string().optional(),
  value: g.float(),
  category: g.string().search(),
  createdBy: g.relation(() => user),
})


export default config({
  schema: g,
})
