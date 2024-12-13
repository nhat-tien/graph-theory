use std::collections::{BinaryHeap, HashMap, HashSet};
use crate::edge::{Edge, EdgeData, EdgeDataResponse, EdgeResponse};
use crate::graph::{add_edge_graph, convert_graph_from_fe_to_list_of_edge, is_cycle, Graph, GraphEdge};

fn get_neighbor_edges(graph: &Graph<i32, GraphEdge>, node: i32) -> Option<Vec<GraphEdge>> {
    match graph.get(&node) {
        Some(neighbor_node) => {
            let edges: Vec<GraphEdge> = vec![];
            for edge in neighbor_node.values() {
                edges.push(edge);
            };
            Some(edges)
        }
        None => None
    }
}

#[tauri::command]
pub fn prim(graph_from_fe: Vec<Edge>, start_point: i32) -> Vec<EdgeResponse> {
    let mut edges: Vec<GraphEdge>= convert_graph_from_fe_to_list_of_edge(&graph_from_fe)?;
    let mut graph_initial: Graph<i32, GraphEdge> = Graph::new();
    let mut graph_travel: Graph<i32, GraphEdge> = Graph::new();
    let mut graph_result = vec![];
    let mut visited = HashSet::new();
    let mut priority_heap = BinaryHeap::new();
    let mut current_node = start_point;

    //set up graph
    for edge in edges.iter() {
        add_edge_graph(&mut graph_initial, edge);
    }

    if let Some(neighbor_node) = graph_initial.get(&start_point) {
        for edge in neighbor_node.values() {
            priority_heap.push(edge);
        }
    }

    while let Some(edge) = priority_heap.pop() {
        if !is_cycle(graph_travel.clone(), edge, start_point) {
            add_edge_graph(&mut graph_travel, edge);
            let result = EdgeResponse {
                include: true,
                edge: EdgeDataResponse {
                    id: edge.id.clone(),
                    weight: edge.weight
                }
            };
            graph_result.push(result);
        }
    }

    return graph_result;
}
