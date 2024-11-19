#![allow(dead_code)]
use std::collections::HashSet;
use serde::{Deserialize, Serialize};


#[derive(Deserialize)]
pub struct EdgeData {
    text: String,
    marker: bool
}

#[derive(Deserialize)]
pub struct Edge {
    id: String,
    source: String,
    target: String,
    data: EdgeData,
    #[serde(rename="type")]
    type_name: String,
}

#[derive(Serialize)]
pub struct EdgeDataResponse {
    id: String,
    weight: i32
}

#[derive(Serialize)]
pub struct EdgeResponse {
    include: bool,
    edge: EdgeDataResponse
}

fn convert_graph_to_tuple(graph: Vec<Edge>) -> Vec<(String, i32, i32, i32)> {
    let mut graph_tuple = vec![];
    for item in graph.iter() {
        let target = item.target.parse::<i32>().unwrap();
        let source = item.source.parse::<i32>().unwrap();
        let weight = item.data.text.parse::<i32>().unwrap();
        graph_tuple.push((item.id.clone(), source, target, weight));
    }
    graph_tuple
}

#[tauri::command]
pub fn kruskal(graph_from_fe: Vec<Edge>) -> Vec<EdgeResponse> {
    let mut graph = convert_graph_to_tuple(graph_from_fe);
    graph.sort_by_key(|k| k.3);
    let mut graph_result = vec![];
    let mut visited = HashSet::new();

    for edge in graph.iter() {
        let source = edge.1;
        let target = edge.2;
        if visited.contains(&source) && visited.contains(&target) {
            let result = EdgeResponse {
                include: false,
                edge: EdgeDataResponse {
                    id: edge.0.clone(),
                    weight: edge.3
                }
            };
            graph_result.push(result);
        } else {
            let result = EdgeResponse {
                include: true,
                edge: EdgeDataResponse {
                    id: edge.0.clone(),
                    weight: edge.3
                }
            };
            graph_result.push(result);

            if !visited.contains(&source) {
                visited.insert(source);
            };
            if !visited.contains(&target) {
                visited.insert(target);
            };
        }
    }

    graph_result
}
