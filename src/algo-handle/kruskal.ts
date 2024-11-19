
interface Edge {
  id: string,
  source: string,
  target: string,
  data: {
    text: string,
    marker: boolean
  }
}

function convertEdgeGraph()
