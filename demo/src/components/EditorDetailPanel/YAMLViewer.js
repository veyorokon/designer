import React from 'react';
import styles from './index.less';

class YAMLViewer extends React.Component {

    constructor(props){
        super(props)


    }

    renderEntities = (entities) => {
        return entities.map(entity => {
            entity = entity.entity;
            let className = ''
            if (entity.selected)
                className='highlight'
            return (
                <React.Fragment>
                    <span className={styles[className]}>
                        <span className={styles.yamlField}>
                            {'    '}- entity:
                        </span>
                    </span>
                    <span className={styles[className]}>
                        <span className={styles.yamlField}>
                            {'        '}category:
                        </span>
                        {' '}{entity.category}
                    </span>
                    <span className={styles[className]}>
                        <span className={styles.yamlField}>
                            {'        '}type:
                        </span>
                            {' '}{entity.type}
                    </span>
                    <span className={styles[className]}>
                        <span className={styles.yamlField}>
                            {'        '}name:
                        </span>
                            {' '}{entity.name}
                    </span>
                    <span className={styles[className]}>
                        <span className={styles.yamlField}>
                            {'        '}description:
                        </span>
                            {' '}{entity.description}
                    </span>
                    <span className={styles[className]}>
                        <span className={styles.yamlField}>
                            {'        '}template_id:
                        </span>
                            {' '}{entity.template_id}
                    </span>
                </React.Fragment>
            )
        });
    }

    renderRelationships = (relationships) =>{
        return relationships.map(relationship => {
            relationship = relationship.relationship;
            let className = ''
            if (relationship.selected)
                className='highlight'
            return (
                <React.Fragment>
                    <span className={styles[className]}>
                        <span className={styles.yamlField}>
                        {'    '}- relationship:
                        </span>
                    </span>
                    <span className={styles[className]}>
                        <span className={styles.yamlField}>
                            {'        '}source:
                        </span>
                        {' '}{relationship.source}
                    </span>
                    <span className={styles[className]}>
                        <span className={styles.yamlField}>
                            {'        '}target:
                        </span>
                        {' '}{relationship.target}
                    </span>
                    <span className={styles[className]}>
                        <span className={styles.yamlField}>
                            {'        '}relationship_type:
                        </span>
                        {' '}{relationship.relationship_type}
                    </span>
                    <span className={styles[className]}>
                        <span className={styles.yamlField}>
                            {'        '}template_id:
                        </span>
                        {' '}{relationship.template_id}
                    </span>
                </React.Fragment>
            )
        });
    }

    renderScenario = (scenario) =>{
        return (
            <React.Fragment>
                <span>
                    <span className={styles.yamlField}>
                    {'    '}- scenario:
                    </span>
                </span>
                <span>
                    <span className={styles.yamlField}>
                        {'        '}condition:
                        </span>
                        {' '}{scenario.condition}
                    </span>
            </React.Fragment>
        )
    }

    renderMetadata = () => {
        return (
            <React.Fragment>
                <span><span className={styles.yamlField}>metadata:</span> </span>
                <span>  <span className={styles.yamlField}>name:</span> root_cause_analysis</span>
            </React.Fragment>
        )
    }


    render(){
        const json = this.props.json;
        return (
            <div class="container">
                <pre>
                    {this.renderMetadata()}
                    <span>  <span className={styles.yamlField}>entities:</span></span>
                    {this.renderEntities(json.entities)}
                    <span>  <span className={styles.yamlField}>relationships:</span></span>
                    {this.renderRelationships(json.relationships)}
                    <span>  <span className={styles.yamlField}>scenarios:</span></span>
                    {this.renderScenario(json.scenario)}
                    <span />
                </pre>
            </div>
        )
    }
}

export default YAMLViewer;
