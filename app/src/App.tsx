import { EventCalendar } from "./components/EventCalendar"
import { FloatButtons } from "./components/FloatButtons"
import { AntdConfigurationProvider } from "./providers/AntdConfigurationProvider"
import { ReactQueryProvider } from "./providers/ReactQueryProvider"
import { TagContextProvider } from "./providers/TagContextProvider"
import { TaskContextProvider } from "./providers/TaskContextProvider"

function App() {
  return (
    <ReactQueryProvider>
      <AntdConfigurationProvider>
        <TagContextProvider>
          <TaskContextProvider>
            <EventCalendar />
            <FloatButtons />
          </TaskContextProvider>
        </TagContextProvider>
      </AntdConfigurationProvider>
    </ReactQueryProvider>
  )
}

export default App

