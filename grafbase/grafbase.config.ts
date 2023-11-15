import { g, config } from '@grafbase/sdk'

const User = g.model('User', {
  name: g.string().length({ min: 3, max: 20 }),
  email: g.string().unique(),
  avatarUrl: g.url(),
  school: g.string(),
  posts: g.relation(() => Post).list().optional(),
  wishLists: g.relation(() => Post).list().optional(),
  // messages: g.relation(() => Message).list().optional()
})

const Post = g.model('Post', {
  title: g.string().length({min: 3}),
  description: g.string().optional(),
  image: g.url(),
  value: g.float(),
  deliveryMethod: g.string().optional(),
  category: g.string().search(),
  createdBy: g.relation(() => User),
})

// const Message = g.model('Message', {
//   content: g.string(),
//   sender: g.relation(() => User),
//   receiver: g.relation(() => User),
//   post: g.relation(() => Post),
// })


export default config({
  schema: g,
})
