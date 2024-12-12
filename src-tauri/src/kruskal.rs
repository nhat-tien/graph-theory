use std::collections::{HashMap, HashSet};
use crate::edge::{Edge, EdgeDataResponse, EdgeResponse};
use crate::graph::{Graph, GraphEdge, is_cycle, add_edge_graph, convert_graph_to_list_of_edge};

#[tauri::command]
pub fn kruskal(graph_from_fe: Vec<Edge>) -> Result<Vec<EdgeResponse>, String> {
    let mut edges: Vec<GraphEdge> = convert_graph_to_list_of_edge(&graph_from_fe)?;
    let mut graph: Graph<i32, GraphEdge> = HashMap::new();

    edges.sort_by_key(|edge| edge.weight);

    let mut graph_result = vec![];

    for edge in edges.iter() {
        if !is_cycle(graph.clone(), edge, edge.source) {
            add_edge_graph(&mut graph, edge);
            let result = EdgeResponse {
                include: true,
                edge: EdgeDataResponse {
                    id: edge.id.clone(),
                    weight: edge.weight
                }
            };
            graph_result.push(result);
        } else {
            let result = EdgeResponse {
                include: false,
                edge: EdgeDataResponse {
                    id: edge.id.clone(),
                    weight: edge.weight
                }
            };
            graph_result.push(result);
        }
    }

    Ok(graph_result)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
    }
}
