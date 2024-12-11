// use std::collections::{BinaryHeap, HashSet};
//
// use crate::edge::{Edge, EdgeData, EdgeDataResponse, EdgeResponse};
//
// struct MatrixEdge {
//     id: String,
//     weight: i32
// } 
//
// impl MatrixEdge {
//     fn new_blank() -> MatrixEdge {
//         MatrixEdge {
//             id: String::from(""),
//             weight: 0
//         }
//     }
//
//     fn new(id: String, weight: i32) -> MatrixEdge {
//         MatrixEdge {
//             id,
//             weight
//         }
//     }
// }
//
// impl Ord for MatrixEdge {
//     fn cmp(&self, other: &Self) -> std::cmp::Ordering {
//         self.weight.cmp(&other.weight).reverse()
//     }
// }
//
// impl PartialOrd for MatrixEdge {
//     fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
//         Some(self.cmp(other))
//     }
// }

// fn generate_blank_matrix(length: i32) -> Vec<Vec<MatrixEdge>> {
//     let mut matrix = vec![];
//     for i in 0..length {
//         let mut row = vec![];
//         for j in 0..length {
//             row.push(MatrixEdge::new_blank());
//         }
//         matrix.push(MatrixEdge::new_blank());
//     }
//     matrix
// }

// fn convert_graph_to_matrix(graph: Vec<Edge>) -> Vec<Vec<MatrixEdge>> {
//     let matrix: Vec<Vec<MatrixEdge>> = generate_blank_matrix(graph.len());
//     for item in graph.iter() {
//         let target = item.target.parse::<i32>().unwrap();
//         let source = item.source.parse::<i32>().unwrap();
//         let weight = item.data.text.parse::<i32>().unwrap();
//         matrix[target][source] = MatrixEdge::new(item.id.clone(), weight);
//         matrix[source][target] = MatrixEdge::new(item.id.clone(), weight);
//     }
//     matrix
// }

// #[tauri::command]
// pub fn prime(graph_from_fe: Vec<Edge>, start_point: i32) -> Vec<EdgeResponse> {
    // let mut matrix: Vec<Vec<MatrixEdge>>  = convert_graph_to_matrix(graph_from_fe);
    // let mut graph_result = vec![];
    // let mut visited = HashSet::new();
    // let mut heap = BinaryHeap::new();
    // let mut current_node = start_point;
    //
    // for i in 0..graph_from_fe.len() {
    //     if matrix[current_node][i] > 0 && matrix[current_node][i] < i32::MAX{
    //         heap.push(matrix[current_node][i]);
    //     }
    // }
    //
    // visited.insert(current_node);
    // for i in 0..graph_from_fe.len() {
    //     matrix[i][current_node] = ("", i32::MAX);
    // }
    // graph_result
// }
