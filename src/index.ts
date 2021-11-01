import TalkbackFactory from "./talkback-factory"
import {DefaultOptions, FallbackMode, RecordMode, Options} from "./options"

const talkback = (options: Partial<Options>) => {
  return TalkbackFactory.server(options)
}

talkback.Options = {
  Default: DefaultOptions,
  FallbackMode,
  RecordMode
}

talkback.requestHandler = (options: Partial<Options>) => TalkbackFactory.requestHandler(options)

export default talkback
module.exports = talkback
