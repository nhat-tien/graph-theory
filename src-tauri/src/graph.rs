use std::collections::{HashMap, HashSet};
use crate::edge::Edge;

#[derive(Eq, Clone)]
pub struct GraphEdge {
    pub id: String,
    pub source: i32,
    pub target: i32,
    pub weight: i32,
}

impl Ord for GraphEdge {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        self.weight.cmp(&other.weight)
    }
}

impl PartialOrd for GraphEdge {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        Some(self.cmp(other))
    }
}

impl PartialEq for GraphEdge {
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
    }
}

pub type Graph<I32, GraphEdge> = HashMap<I32, HashMap<I32, GraphEdge>>;

pub fn add_edge_graph(graph: &mut Graph<i32, GraphEdge>, edge: &GraphEdge) {
    graph
        .entry(edge.source)
        .or_default()
        .insert(edge.target, edge.clone());
    graph
        .entry(edge.target)
        .or_default()
        .insert(edge.source, edge.clone());
}

pub fn is_cycle(mut graph: Graph<i32, GraphEdge>, edge: &GraphEdge, start_node: i32) -> bool {
    let mut visited_node: HashSet<i32> = HashSet::new();
    let mut stack_waiting_node: Vec<i32> = vec![];
 
    visited_node.insert(start_node);
    add_edge_graph(&mut graph, edge);

    if let Some(neighbor_node) = graph.get(&start_node) {
        for key in neighbor_node.keys() {
            stack_waiting_node.push(*key);
        }
    }

    while let Some(pop_node) = stack_waiting_node.pop() {
        if visited_node.contains(&pop_node) {
            return true;
        }
        if let Some(neighbor_node) = graph.get(&pop_node) {
            for key in neighbor_node.keys() {
                //prevent push visited node to stack
                if !visited_node.contains(key) {
                    stack_waiting_node.push(*key);
                }
            }
        }
        visited_node.insert(pop_node);
    }
    return false;
}

fn parse_i32(string: &str) -> Result<i32, String> {
    string
        .parse::<i32>()
        .map_err(|_| "Error: format number".into())
}

pub fn convert_graph_from_fe_to_list_of_edge(graph: &Vec<Edge>) -> Result<Vec<GraphEdge>, String> {
    let mut list_of_edge = vec![];
    for item in graph.iter() {
        let target = parse_i32(&item.target)?;
        let source = parse_i32(&item.source)?;
        let weight = parse_i32(&item.data.text)?;
        let id = item.id.clone();
        list_of_edge.push(GraphEdge {
            id,
            source,
            target,
            weight,
        });
    }
    Ok(list_of_edge)
}
