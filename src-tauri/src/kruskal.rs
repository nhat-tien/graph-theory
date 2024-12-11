#![allow(dead_code)]
use std::collections::HashSet;
use crate::edge::{Edge, EdgeResponse, EdgeDataResponse};

fn parse_i32(string: &str) -> Result<i32, String> {
    string.parse::<i32>().map_err(|_| "Lỗi quá trình phân tích số".into())
}

fn convert_graph_to_tuple(graph: Vec<Edge>) -> Result<Vec<(String, i32, i32, i32)>, String> {
    let mut graph_tuple = vec![];
    for item in graph.iter() {
        let target = parse_i32(&item.target)?;
        let source = parse_i32(&item.source)?;
        let weight =parse_i32(&item.data.text)?;
        graph_tuple.push((item.id.clone(), source, target, weight));
    }
    Ok(graph_tuple)
}

#[tauri::command]
pub fn kruskal(graph_from_fe: Vec<Edge>) -> Result<Vec<EdgeResponse>, String> {
    let mut graph = convert_graph_to_tuple(graph_from_fe)?;
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

    Ok(graph_result)
}
