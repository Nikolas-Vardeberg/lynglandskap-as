/**
 * Requires sanity-plugin-media to be installed.
 * Import and add to plugins in sanity.config.ts, as such:
 * mediaAssetPlugin({
 *	 altTextFieldName: 'altTextOverride',
 * 	descriptionFieldName: 'caption'
 * }),
 */

 import { client } from '@/sanity/lib/client';
 import type { SanityAsset } from '@sanity/image-url/lib/types/types';
 import { Box, Button, Flex, Stack, Text, TextInput } from '@sanity/ui';
 import { groq } from 'next-sanity';
 import type React from 'react';
 import { useCallback, useEffect, useMemo, useState } from 'react';
 import {
     type FieldMember,
     type ImageValue,
     type InputProps,
     MemberField,
     type ObjectInputProps,
     type ObjectSchemaType,
     set,
     unset,
 } from 'sanity';
 import { definePlugin } from 'sanity';
 
 type Props = {
     /** The name of you alt text field */
     altTextFieldName?: string;
     /** The name of you title field */
     titleFieldName?: string;
     /** The name of you description field */
     descriptionFieldName?: string;
 };
 
 export const mediaAssetPlugin = definePlugin((props: Props) => ({
     name: 'media-asset-plugin',
 
     form: {
         components: {
             input: (inputProps) => {
                 if (inputProps.schemaType.type?.name === 'image')
                     return (
                         <MediaInputField
                             {...props}
                             {...(inputProps as ObjectInputProps<ImageValue, ObjectSchemaType>)}
                         />
                     );
 
                 return inputProps.renderDefault(inputProps);
             },
         },
     },
 }));
 
 const MediaInputField = (props: ObjectInputProps<ImageValue, ObjectSchemaType> & Props) => {
     const { renderDefault, value, members, altTextFieldName, descriptionFieldName, titleFieldName } = props;
 
     const altTextField = members.find(
         (member): member is FieldMember => member.kind === 'field' && member.name === altTextFieldName,
     );
 
     const titleField = members.find(
         (member): member is FieldMember => member.kind === 'field' && member.name === titleFieldName,
     );
 
     const descriptionField = members.find(
         (member): member is FieldMember => member.kind === 'field' && member.name === descriptionFieldName,
     );
 
     return (
         <>
             {renderDefault({
                 ...props,
                 members: members.filter((member) => member.key !== `field-${altTextFieldName}`),
             })}
             {altTextField && (
                 <MemberField
                     member={altTextField}
                     renderInput={(props) => (
                         <AssetProperty {...props} assetId={value?.asset?._ref as string} propertyName='altText' />
                     )}
                     renderField={props.renderField}
                     renderItem={props.renderItem}
                     renderPreview={props.renderPreview}
                 />
             )}
             {titleField && (
                 <MemberField
                     member={titleField}
                     renderInput={(props) => (
                         <AssetProperty {...props} assetId={value?.asset?._ref as string} propertyName='title' />
                     )}
                     renderField={props.renderField}
                     renderItem={props.renderItem}
                     renderPreview={props.renderPreview}
                 />
             )}
             {descriptionField && (
                 <MemberField
                     member={descriptionField}
                     renderInput={(props) => (
                         <AssetProperty {...props} assetId={value?.asset?._ref as string} propertyName='description' />
                     )}
                     renderField={props.renderField}
                     renderItem={props.renderItem}
                     renderPreview={props.renderPreview}
                 />
             )}
         </>
     );
 };
 
 const AssetProperty = (
     props: Omit<InputProps, 'renderDefault'> & {
         assetId: string;
         propertyName: 'altText' | 'title' | 'description';
     },
 ) => {
     const { onChange, elementProps, assetId, value, propertyName } = props;
 
     const [errorText, setErrorText] = useState<string>();
     const [propertyValue, setPropertyValue] = useState<string>(value as string);
     const [asset, setAsset] = useState<SanityAsset>();
 
     useEffect(() => {
         if (value) setPropertyValue(value as string);
     }, [value]);
 
     const isModified = useMemo(() => {
         if (!assetId) return false;
         return asset?.altText !== propertyValue && !!propertyValue;
     }, [asset, propertyValue, assetId]);
 
     const fetchAssetData = useCallback(async () => {
         if (assetId) {
             const asset = await client.fetch<SanityAsset>(groq`*[_type=="sanity.imageAsset" && _id == $id][0]`, {
                 id: assetId,
             });
             setAsset(asset);
         }
     }, [assetId]);
 
     const handleChange = useCallback(
         (event: React.ChangeEvent<HTMLInputElement>) =>
             onChange(event.currentTarget.value ? set(event.currentTarget.value) : unset()),
         [onChange],
     );
 
     const handlePermanentChange = useCallback(
         async (value?: string) => {
             if (assetId) {
                 try {
                     value
                         ? await client
                                 .withConfig({ withCredentials: true })
                                 .patch(assetId)
                                 .set({ [propertyName]: value })
                                 .commit()
                         : await client.patch(assetId).unset([propertyName]).commit();
                     fetchAssetData();
                 } catch (err) {
                     setErrorText('Noe gikk galt. Forsøk å oppdatere via media-biblioteket istedenfor.');
                     console.log(err);
                 }
             }
         },
         [assetId, fetchAssetData, propertyName],
     );
 
     useEffect(() => {
         fetchAssetData();
     }, [fetchAssetData]);
 
     return (
         <Stack space={3}>
             <Flex width={'100%'} direction={['column', 'column', 'row']}>
                 <Box flex={1} paddingRight={[0, 0, 2]} paddingBottom={[2, 2, 0]}>
                     <TextInput
                         {...elementProps}
                         onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                             setPropertyValue(event.currentTarget.value);
                             handleChange(event);
                         }}
                         value={propertyValue || ''}
                     />
                 </Box>
                 {assetId && (
                     <Button
                         type='button'
                         text='Endre globalt'
                         mode='ghost'
                         tone='critical'
                         disabled={!isModified}
                         onClick={() => handlePermanentChange(propertyValue)}
                     />
                 )}
             </Flex>
             {errorText && (
                 <Text size={1} style={{ color: 'red' }}>
                     {errorText}
                 </Text>
             )}
             {assetId && asset?.altText && (
                 <Text size={1} muted>
                     Global alternativ tekst: <span style={{ fontStyle: 'italic' }}> {asset.altText}</span>
                 </Text>
             )}
         </Stack>
     );
 };