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

fn add_edge(graph: &mut Graph, v1: i32, v2: i32, weight: i32, id: String) {
    graph.entry(v1).or_default().insert(v2, MatrixEdge::new(id, weight));
    graph.entry(v2).or_default().insert(v1, MatrixEdge::new(id, weight));
}

fn convert_graph(graph: &Vec<Edge>) -> Graph {
    let mut new_graph: Graph = HashMap::new();
    for item in graph.iter() {
        let target = item.target.parse::<usize>().unwrap();
        let source = item.source.parse::<usize>().unwrap();
        let weight = item.data.text.parse::<i32>().unwrap();
        let id = item.id;
        add_edge(&mut new_graph, target, source, weight, id)
    }
    new_graph 
}

#[tauri::command]
pub fn prime(graph_from_fe: Vec<Edge>, start_point: i32) -> Vec<EdgeResponse> {
    let graph = convert_graph(&graph_from_fe);
    let mut visited = HashSet::new();
    let mut prio = BinaryHeap::new();
    let mut current_node = start_point;

    graph.entry(start_point)
}
