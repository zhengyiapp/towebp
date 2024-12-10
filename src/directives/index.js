import registerLazyimg from './lazyimg'
import registerDepic from './depic'

export default app => {
  registerLazyimg(app)
  registerDepic(app)
}