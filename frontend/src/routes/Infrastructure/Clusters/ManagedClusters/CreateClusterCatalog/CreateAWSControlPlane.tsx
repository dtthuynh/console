/* Copyright Contributors to the Open Cluster Management project */
import { CheckIcon } from '@patternfly/react-icons'
import {
    CatalogCardItemType,
    CatalogColor,
    getPatternflyColor,
    ICatalogBreadcrumb,
    ICatalogCard,
    ItemView,
    PageHeader,
    PatternFlyColor,
} from '@stolostron/react-data-view'
import { Fragment, useCallback, useMemo } from 'react'
import { useTranslation } from '../../../../../lib/acm-i18next'
import { NavigationPath, useBackCancelNavigation } from '../../../../../NavigationPath'
import { Provider } from '../../../../../ui-components'
import { getTypedCreateClusterPath } from '../ClusterInfrastructureType'

export function CreateAWSControlPlane() {
    const [t] = useTranslation()
    const { nextStep, back, cancel } = useBackCancelNavigation()
    const cards = useMemo(() => {
        const newCards: ICatalogCard[] = [
            {
                id: 'hosted',
                title: t('Hosted'),
                items: [
                    {
                        type: CatalogCardItemType.Description,
                        description: t(
                            'Run an OpenShift cluster where the control plane is decoupled from the data plane, and is treated like a multi-tenant workload on a hosting service cluster. The data plane is on a separate network domain that allows segmentation between management and workload traffic.'
                        ),
                    },
                    {
                        type: CatalogCardItemType.List,
                        title: t('Features'),
                        icon: <CheckIcon color={getPatternflyColor(PatternFlyColor.Green)} />,
                        items: [
                            {
                                text: t(
                                    'Reduces costs by efficiently reusing an OpenShift cluster to host multiple control planes.'
                                ),
                            },
                            { text: t('Quickly provisions clusters.') },
                        ],
                    },
                ],
                onClick: nextStep(NavigationPath.createAWSCLI),
                badgeList: [
                    {
                        badge: t('Technology preview'),
                        badgeColor: CatalogColor.orange,
                    },
                    {
                        badge: t('CLI-based'),
                        badgeColor: CatalogColor.purple,
                    },
                ],
            },
            {
                id: 'standalone',
                title: t('Standalone'),
                items: [
                    {
                        type: CatalogCardItemType.Description,
                        description: t(
                            'Run an OpenShift cluster where the control plane and data plan are coupled. The control plane is hosted by a dedicated group of physical or virtual nodes and the network stack is shared.'
                        ),
                    },
                    {
                        type: CatalogCardItemType.List,
                        title: t('Features'),
                        icon: <CheckIcon color={getPatternflyColor(PatternFlyColor.Green)} />,
                        items: [
                            {
                                text: t(
                                    'Increases resilienency with closely interconnected control plane and worker nodes.'
                                ),
                            },
                            {
                                text: t('Provides customized control plane cluster configuration.'),
                                subTitles: [t('Standard'), t('Single node OpenShift'), t('Three-node cluster')],
                            },
                        ],
                    },
                ],
                onClick: nextStep(getTypedCreateClusterPath(Provider.aws)),
                badge: t('Classic'),
                badgeColor: CatalogColor.purple,
            },
        ]
        return newCards
    }, [nextStep, t])

    const keyFn = useCallback((card: ICatalogCard) => card.id, [])

    const breadcrumbs = useMemo(() => {
        const newBreadcrumbs: ICatalogBreadcrumb[] = [
            { label: t('Clusters'), to: NavigationPath.clusters },
            { label: t('Infrastructure'), to: NavigationPath.createCluster },
            { label: t('Control plane type') },
        ]
        return newBreadcrumbs
    }, [t])

    return (
        <Fragment>
            <PageHeader
                title={t('Control plane type')}
                description={t('Choose a control plane type for your cluster.')}
                breadcrumbs={breadcrumbs}
            />
            <ItemView
                items={cards}
                itemKeyFn={keyFn}
                itemToCardFn={(card) => card}
                onBack={back(NavigationPath.createCluster)}
                onCancel={cancel(NavigationPath.clusters)}
            />
        </Fragment>
    )
}