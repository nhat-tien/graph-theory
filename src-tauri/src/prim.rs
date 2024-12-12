use std::collections::{BinaryHeap, HashMap, HashSet};
use crate::edge::{Edge, EdgeData, EdgeDataResponse, EdgeResponse};
use crate::graph::{add_edge_graph, convert_graph_to_list_of_edge, is_cycle, Graph, GraphEdge};




#[tauri::command]
pub fn prime(graph_from_fe: Vec<Edge>, start_point: i32) -> Vec<EdgeResponse> {
    let mut edges = convert_graph_to_list_of_edge(&graph_from_fe);
    let mut graph: Graph<i32, GraphEdge> = HashMap::new();
    let mut visited = HashSet::new();
    let mut priority_heap = BinaryHeap::new();
    let mut current_node = start_point;
}
