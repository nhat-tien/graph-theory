use std::collections::{BinaryHeap, HashMap, HashSet};

use crate::edge::{Edge, EdgeData, EdgeDataResponse, EdgeResponse};


#[derive(Eq, PartialEq, Clone)]
struct MatrixEdge {
    id: String,
    weight: i32
} 

impl MatrixEdge {
    fn new_blank() -> MatrixEdge {
        MatrixEdge {
            id: String::from(""),
            weight: 0
        }
    }

    fn new(id: String, weight: i32) -> MatrixEdge {
        MatrixEdge {
            id,
            weight
        }
    }
}

impl Ord for MatrixEdge {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        self.weight.cmp(&other.weight).reverse()
    }
}

impl PartialOrd for MatrixEdge {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        Some(self.cmp(other))
    }
}

type Graph<i32, MatrixEdge> = HashMap<i32, HashMap<i32, MatrixEdge>>;

fn generate_blank_matrix(length: i32) -> Vec<Vec<MatrixEdge>> {
    let mut matrix = vec![];
    for _i in 0..length {
        let mut row = vec![];
        for _j in 0..length {
            row.push(MatrixEdge::new_blank());
        }
        matrix.push(row);
    }
    matrix
}

fn convert_graph_to_matrix(graph: &Vec<Edge>) -> Vec<Vec<MatrixEdge>> {
    let mut matrix: Vec<Vec<MatrixEdge>> = generate_blank_matrix(graph.len() as i32);
    for item in graph.iter() {
        let target = item.target.parse::<usize>().unwrap();
        let source = item.source.parse::<usize>().unwrap();
        let weight = item.data.text.parse::<i32>().unwrap();
        matrix[target][source] = MatrixEdge::new(item.id.clone(), weight);
        matrix[source][target] = MatrixEdge::new(item.id.clone(), weight);
    }
    matrix
}

#[tauri::command]
pub fn prime(graph_from_fe: Vec<Edge>, start_point: i32) -> Vec<EdgeResponse> {
    let mut matrix: Vec<Vec<MatrixEdge>>  = convert_graph_to_matrix(&graph_from_fe);
    let mut graph_result = vec![];
    let mut visited = HashSet::new();
    let mut heap = BinaryHeap::new();
    let mut current_node = start_point;

    for i in 0..graph_from_fe.len() {
        if matrix[current_node as usize][i as usize].weight > 0 && matrix[current_node as usize][i as usize].weight < i32::MAX{
            heap.push(&matrix[current_node as usize][i as usize]);
        }
    }

    visited.insert(current_node);
    for i in 0..graph_from_fe.len() {
        matrix[i as usize][current_node as usize] = MatrixEdge::new("".into(), i32::MAX);
    }
    graph_result
}
