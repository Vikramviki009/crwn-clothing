import React from 'react';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import { Route } from 'react-router-dom';
import CollectionPage from '../collection/collection.component';
import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWtihSpinner = WithSpinner( CollectionsOverview );
const CollectionPageWithSpinner = WithSpinner( CollectionPage );

class ShopPage extends React.Component{

    state = {
        loading: true
    };

    unsubscribeFromSnapshot = null;

    componentDidMount(){
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');

        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapShot =>{
            const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
            updateCollections(collectionsMap);
            this.setState({ loading : false });
        });
    };

    render(){
        const { match } = this.props;
        const { loading } = this.state;

        return(
            <div className='shop-page'>
                <Route exact path = {`${match.path}`} render = {(props) => <CollectionsOverviewWtihSpinner isLoading={ loading } {...props} />}/>
                <Route path={`${match.path}/:collectionId`} render = {(props) => <CollectionPageWithSpinner isLoading={ loading } {...props} />}/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch =>({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);