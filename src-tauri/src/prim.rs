use crate::edge::{Edge, EdgeDataResponse, EdgeResponse};
use crate::graph::{
    add_edge_graph, convert_graph_from_fe_to_list_of_edge, is_cycle, Graph, GraphEdge,
};
use std::collections::HashSet;

fn get_edges_at_node(graph: &Graph<i32, GraphEdge>, node: i32) -> Option<Vec<(i32, GraphEdge)>> {
    match graph.get(&node) {
        Some(neighbor_node) => {
            let mut edges: Vec<(i32, GraphEdge)> = vec![];
            for (node, edge) in neighbor_node {
                edges.push((*node, edge.clone()));
            }
            Some(edges)
        }
        None => None,
    }
}

fn get_min_weight_edge(list: &Vec<(i32, GraphEdge)>) -> &(i32, GraphEdge) {
    let mut min: &(i32, GraphEdge) = &list[0];
    for item in list.iter() {
        if item.1 < min.1 {
            min = item;
        }
    }
    min
}

#[tauri::command]
pub fn prim(graph_from_fe: Vec<Edge>, start_point: i32) -> Result<Vec<Vec<EdgeResponse>>, String> {
    let edges: Vec<GraphEdge> = convert_graph_from_fe_to_list_of_edge(&graph_from_fe)?;
    let mut graph_initial: Graph<i32, GraphEdge> = Graph::new();
    let mut graph_travel: Graph<i32, GraphEdge> = Graph::new();
    let mut graph_result: Vec<Vec<EdgeResponse>> = vec![];
    let mut visited_nodes: HashSet<i32> = HashSet::new();

    visited_nodes.insert(start_point);
    for edge in edges.iter() {
        add_edge_graph(&mut graph_initial, edge);
    }

    loop {
        let mut edges_response: Vec<EdgeResponse> = vec![];
        let mut neighbor_edges: Vec<(i32, GraphEdge)> = vec![];
        for node in visited_nodes.iter() {
            if let Some(list_of_edge) = get_edges_at_node(&graph_initial, *node) {
                for (target_node, edge) in list_of_edge.iter() {
                    if visited_nodes.contains(&target_node) {
                        continue;
                    };
                    if is_cycle(graph_travel.clone(), edge, *target_node) {
                        continue;
                    }
                    neighbor_edges.push((*target_node, edge.clone()));
                }
            }
        }
        if neighbor_edges.len() == 0 {
            break;
        };
        let (min_node, min_edge): &(i32, GraphEdge) = get_min_weight_edge(&neighbor_edges);

        visited_nodes.insert(*min_node);
        add_edge_graph(&mut graph_travel, &min_edge);

        for (_node, edge) in neighbor_edges.iter() {
            if min_edge == edge {
                let result = EdgeResponse {
                    include: true,
                    edge: EdgeDataResponse {
                        id: edge.id.clone(),
                        weight: edge.weight,
                    },
                };
                edges_response.push(result);
            } else {
                let result = EdgeResponse {
                    include: false,
                    edge: EdgeDataResponse {
                        id: edge.id.clone(),
                        weight: edge.weight,
                    },
                };
                edges_response.push(result);
            }
        }
        graph_result.push(edges_response);
    }
    Ok(graph_result)
}
