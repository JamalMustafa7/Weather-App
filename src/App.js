import './App.css';
import {QueryClient,QueryClientProvider} from 'react-query';
import {Ui} from './Ui';
const client=new QueryClient();
function App()
{
  return (

    <QueryClientProvider client={client}>
      <Ui />
    </QueryClientProvider>
  );
}

export default App;
